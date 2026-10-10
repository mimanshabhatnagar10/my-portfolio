/**
 * Instruction Set Simulator Engine (issEngine.js)
 * 
 * Supports:
 * - Three-Address Instructions: OP DEST, SRC1, SRC2 (e.g. ADD T1, A, B)
 * - Two-Address Instructions: OP DEST, SRC (e.g. ADD A, B -> DEST = DEST op SRC)
 * - One-Address Instructions: OP OPERAND (e.g. LOAD A, ADD B, STORE C -> AC = AC op SRC)
 * - Zero-Address Instructions: PUSH / POP / ADD / SUB / MUL / DIV (Operand stack semantics)
 * 
 * Includes full step-by-step execution pointer (PC tracking) and line validation.
 * Zero eval(): All assembly lines are parsed into tokens and executed safely.
 */

export const SAMPLE_PROGRAMS = {
  threeAddress: `// 1. Three-Address Mode (OP DEST, SRC1, SRC2)
MOV A, 25
MOV B, 15
MOV C, 10
MOV D, 4
ADD T1, A, B    // T1 = A + B (40)
SUB T2, C, D    // T2 = C - D (6)
MUL T3, T1, T2  // T3 = T1 * T2 (240)
DIV T4, T3, 5   // T4 = T3 / 5 (48)
STORE RESULT, T4`,

  twoAddress: `// 2. Two-Address Mode (OP DEST, SRC -> DEST = DEST op SRC)
MOV A, 20       // A = 20
MOV B, 5        // B = 5
ADD A, B        // A = A + B (25)
SUB A, 10       // A = A - 10 (15)
MUL A, 2        // A = A * 2 (30)
MOV RESULT, A   // RESULT = A (30)`,

  oneAddress: `// 3. One-Address Mode (OP OPERAND -> Accumulator AC)
MOV A, 50
MOV B, 10
LOAD A          // AC = Memory[A] (50)
ADD B           // AC = AC + B (60)
DIV 4           // AC = AC / 4 (15)
STORE RESULT    // Memory[RESULT] = AC (15)`,

  zeroAddress: `// 4. Zero-Address Mode (Stack Semantics)
PUSH 30         // Push 30 onto stack -> Stack: [30]
PUSH 15         // Push 15 onto stack -> Stack: [30, 15]
ADD             // Pop 15 & 30, Push 45 -> Stack: [45]
PUSH 5          // Push 5 onto stack -> Stack: [45, 5]
MUL             // Pop 5 & 45, Push 225 -> Stack: [225]
POP RESULT      // Pop 225 to RESULT -> Stack: []`,

  basic: `// Sample: Three-Address Arithmetic Pipeline
MOV A, 25
MOV B, 15
ADD T1, A, B
SUB T2, A, B
MUL T3, T1, T2
STORE RESULT, T3`,

  expression: `// Sample: Expression Evaluation (A + B) * (C - D)
MOV A, 8
MOV B, 12
MOV C, 20
MOV D, 6
ADD T1, A, B
SUB T2, C, D
MUL T3, T1, T2
STORE RESULT, T3`
};

export class InstructionSimulator {
  constructor() {
    this.reset();
  }

  reset() {
    this.pc = 0;
    this.registers = {
      T1: 0,
      T2: 0,
      T3: 0,
      T4: 0,
      R1: 0,
      R2: 0,
      AC: 0
    };
    this.memory = {
      A: 0,
      B: 0,
      C: 0
    };
    this.stack = [];
    this.logs = [];
    this.cycleCount = 0;
    this.parsedLines = [];
    this.stepIndex = 0;
    this.mode = 'all'; // '3-address', '2-address', '1-address', '0-address', or 'all'
  }

  setMode(mode) {
    this.mode = mode;
  }

  /**
   * Resolve an operand string to a numerical value.
   */
  resolveValue(token) {
    if (!token) return 0;
    const clean = token.trim();

    // Integer literal check
    if (/^-?\d+$/.test(clean)) {
      return parseInt(clean, 10);
    }

    const upper = clean.toUpperCase();

    // Check registers
    if (this.registers.hasOwnProperty(upper)) {
      return this.registers[upper];
    }

    // Check memory variables
    if (this.memory.hasOwnProperty(upper)) {
      return this.memory[upper];
    }

    // New memory variable: initialize with 0
    this.memory[upper] = 0;
    return 0;
  }

  /**
   * Assign value to destination (register or memory variable).
   */
  assignDestination(destToken, value) {
    const clean = destToken.trim().toUpperCase();

    if (this.registers.hasOwnProperty(clean) || /^T\d+$/i.test(clean) || /^R\d+$/i.test(clean) || clean === 'AC') {
      this.registers[clean] = value;
      return `Reg[${clean}] = ${value}`;
    }

    this.memory[clean] = value;
    return `Memory[${clean}] = ${value}`;
  }

  /**
   * Parse full code editor string into valid execution lines.
   */
  parseCode(codeText) {
    if (!codeText || !codeText.trim()) return [];

    const rawLines = codeText.split('\n');
    const validOpcodes = ['ADD', 'SUB', 'MUL', 'DIV', 'MOV', 'LOAD', 'STORE', 'PUSH', 'POP'];
    const parsed = [];

    for (let i = 0; i < rawLines.length; i++) {
      const rawLine = rawLines[i].trim();
      const lineNum = i + 1;

      if (!rawLine || rawLine.startsWith('//') || rawLine.startsWith('#') || rawLine.startsWith(';')) {
        continue;
      }

      const firstSpace = rawLine.indexOf(' ');
      let opcode = '';
      let operandsStr = '';

      if (firstSpace === -1) {
        opcode = rawLine.toUpperCase();
      } else {
        opcode = rawLine.slice(0, firstSpace).trim().toUpperCase();
        operandsStr = rawLine.slice(firstSpace + 1).trim();
      }

      // Remove trailing comments if present on line (e.g. MOV A, 5 // comment)
      const commentIdx = operandsStr.search(/\/\/|#|;/);
      if (commentIdx !== -1) {
        operandsStr = operandsStr.slice(0, commentIdx).trim();
      }

      if (!validOpcodes.includes(opcode)) {
        throw new Error(`Line ${lineNum}: Unknown instruction opcode '${opcode}'. Supported: ${validOpcodes.join(', ')}`);
      }

      const operands = operandsStr
        ? operandsStr.split(',').map(op => op.trim()).filter(Boolean)
        : [];

      parsed.push({
        lineNum,
        rawLine,
        opcode,
        operands
      });
    }

    return parsed;
  }

  /**
   * Prepare program for step-by-step execution.
   */
  prepare(codeText, mode = 'all') {
    this.reset();
    this.mode = mode;
    this.parsedLines = this.parseCode(codeText);
    this.stepIndex = 0;
    return this.parsedLines;
  }

  /**
   * Execute a single parsed instruction line.
   */
  executeLineItem(item) {
    const { lineNum, rawLine, opcode, operands } = item;
    this.cycleCount++;
    this.pc = lineNum;

    let stepLog = '';

    switch (opcode) {
      case 'MOV': {
        if (operands.length !== 2) {
          throw new Error(`Line ${lineNum}: MOV expects 2 operands (DEST, SRC), found ${operands.length}. Example: MOV A, 15`);
        }
        const [dest, src] = operands;
        const val = this.resolveValue(src);
        const assignMsg = this.assignDestination(dest, val);
        stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: MOV ${dest}, ${src}  -->  ${assignMsg}`;
        break;
      }

      case 'LOAD': {
        if (operands.length === 1) {
          const [src] = operands;
          const val = this.resolveValue(src);
          this.registers.AC = val;
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: LOAD ${src}  -->  Reg[AC] = ${val} (1-Address Accumulator)`;
        } else if (operands.length === 2) {
          const [dest, src] = operands;
          const val = this.resolveValue(src);
          const assignMsg = this.assignDestination(dest, val);
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: LOAD ${dest}, ${src}  -->  ${assignMsg}`;
        } else {
          throw new Error(`Line ${lineNum}: LOAD expects 1 or 2 operands. Example: LOAD A (1-address) or LOAD R1, A (2-address)`);
        }
        break;
      }

      case 'STORE': {
        if (operands.length === 1) {
          const [dest] = operands;
          const val = this.registers.AC;
          const assignMsg = this.assignDestination(dest, val);
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: STORE ${dest}  -->  ${assignMsg} (stored from Accumulator AC = ${val})`;
        } else if (operands.length === 2) {
          const [dest, src] = operands;
          const val = this.resolveValue(src);
          const assignMsg = this.assignDestination(dest, val);
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: STORE ${dest}, ${src}  -->  ${assignMsg}`;
        } else {
          throw new Error(`Line ${lineNum}: STORE expects 1 or 2 operands. Example: STORE RESULT`);
        }
        break;
      }

      case 'ADD':
      case 'SUB':
      case 'MUL':
      case 'DIV': {
        if (operands.length === 3) {
          // Three-Address Mode: OP DEST, SRC1, SRC2
          const [dest, src1, src2] = operands;
          const v1 = this.resolveValue(src1);
          const v2 = this.resolveValue(src2);

          if (opcode === 'DIV' && v2 === 0) {
            throw new Error(`Line ${lineNum}: Division by zero in '${rawLine}'.`);
          }

          let result = 0;
          if (opcode === 'ADD') result = v1 + v2;
          else if (opcode === 'SUB') result = v1 - v2;
          else if (opcode === 'MUL') result = v1 * v2;
          else if (opcode === 'DIV') result = Math.floor(v1 / v2);

          const assignMsg = this.assignDestination(dest, result);
          const opSymbol = { ADD: '+', SUB: '-', MUL: '*', DIV: '/' }[opcode];
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum} (3-Address): ${opcode} ${dest}, ${src1}, ${src2}  -->  ${v1} ${opSymbol} ${v2} = ${result} (${assignMsg})`;
        } else if (operands.length === 2) {
          // Two-Address Mode: OP DEST, SRC (DEST = DEST op SRC)
          const [dest, src] = operands;
          const v1 = this.resolveValue(dest);
          const v2 = this.resolveValue(src);

          if (opcode === 'DIV' && v2 === 0) {
            throw new Error(`Line ${lineNum}: Division by zero in '${rawLine}'.`);
          }

          let result = 0;
          if (opcode === 'ADD') result = v1 + v2;
          else if (opcode === 'SUB') result = v1 - v2;
          else if (opcode === 'MUL') result = v1 * v2;
          else if (opcode === 'DIV') result = Math.floor(v1 / v2);

          const assignMsg = this.assignDestination(dest, result);
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum} (2-Address): ${opcode} ${dest}, ${src}  -->  ${v1} with ${v2} = ${result} (${assignMsg})`;
        } else if (operands.length === 1) {
          // One-Address Mode: OP SRC (AC = AC op SRC)
          const [src] = operands;
          const v1 = this.registers.AC;
          const v2 = this.resolveValue(src);

          if (opcode === 'DIV' && v2 === 0) {
            throw new Error(`Line ${lineNum}: Division by zero in '${rawLine}'.`);
          }

          let result = 0;
          if (opcode === 'ADD') result = v1 + v2;
          else if (opcode === 'SUB') result = v1 - v2;
          else if (opcode === 'MUL') result = v1 * v2;
          else if (opcode === 'DIV') result = Math.floor(v1 / v2);

          this.registers.AC = result;
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum} (1-Address Accumulator): ${opcode} ${src}  -->  Reg[AC] = ${result}`;
        } else if (operands.length === 0) {
          // Zero-Address Mode (Stack)
          if (this.stack.length < 2) {
            throw new Error(`Line ${lineNum}: Stack underflow in '${opcode}'. Requires at least 2 operands on top of stack.`);
          }
          const v2 = this.stack.pop();
          const v1 = this.stack.pop();

          if (opcode === 'DIV' && v2 === 0) {
            throw new Error(`Line ${lineNum}: Division by zero in '${rawLine}'.`);
          }

          let result = 0;
          if (opcode === 'ADD') result = v1 + v2;
          else if (opcode === 'SUB') result = v1 - v2;
          else if (opcode === 'MUL') result = v1 * v2;
          else if (opcode === 'DIV') result = Math.floor(v1 / v2);

          this.stack.push(result);
          stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum} (0-Address Stack): ${opcode}  -->  Popped ${v1}, ${v2}; Pushed ${result} -> Stack: [${this.stack.join(', ')}]`;
        } else {
          throw new Error(`Line ${lineNum}: Unexpected operand count (${operands.length}) for opcode '${opcode}'.`);
        }
        break;
      }

      case 'PUSH': {
        if (operands.length !== 1) {
          throw new Error(`Line ${lineNum}: PUSH expects 1 operand. Example: PUSH A`);
        }
        const val = this.resolveValue(operands[0]);
        this.stack.push(val);
        stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: PUSH ${operands[0]}  -->  Pushed ${val} onto Stack -> Stack: [${this.stack.join(', ')}]`;
        break;
      }

      case 'POP': {
        if (operands.length !== 1) {
          throw new Error(`Line ${lineNum}: POP expects 1 operand (DEST). Example: POP RESULT`);
        }
        if (this.stack.length === 0) {
          throw new Error(`Line ${lineNum}: Stack underflow error on POP — stack is empty.`);
        }
        const val = this.stack.pop();
        const assignMsg = this.assignDestination(operands[0], val);
        stepLog = `[Cycle ${this.cycleCount}] Line ${lineNum}: POP ${operands[0]}  -->  Popped ${val} -> ${assignMsg}`;
        break;
      }
    }

    this.logs.push(stepLog);
    return stepLog;
  }

  /**
   * Step to the next single instruction.
   */
  stepNext() {
    if (this.stepIndex >= this.parsedLines.length) {
      return {
        done: true,
        finished: true,
        logs: this.logs,
        registers: this.registers,
        memory: this.memory,
        stack: this.stack,
        pc: this.pc,
        cycles: this.cycleCount
      };
    }

    const item = this.parsedLines[this.stepIndex];
    try {
      const stepLog = this.executeLineItem(item);
      this.stepIndex++;
      const isLast = this.stepIndex >= this.parsedLines.length;

      if (isLast) {
        this.logs.push(`\nStep execution complete in ${this.cycleCount} CPU cycles.`);
      }

      return {
        done: isLast,
        finished: isLast,
        currentLineNum: item.lineNum,
        rawLine: item.rawLine,
        stepLog,
        logs: this.logs,
        registers: this.registers,
        memory: this.memory,
        stack: this.stack,
        pc: this.pc,
        cycles: this.cycleCount
      };
    } catch (err) {
      return {
        done: true,
        error: err.message,
        currentLineNum: item.lineNum,
        rawLine: item.rawLine,
        logs: this.logs,
        registers: this.registers,
        memory: this.memory,
        stack: this.stack,
        pc: this.pc,
        cycles: this.cycleCount
      };
    }
  }

  /**
   * Run full program from start to completion.
   */
  run(codeText, mode = 'all') {
    this.reset();
    this.mode = mode;

    try {
      this.parsedLines = this.parseCode(codeText);
      if (this.parsedLines.length === 0) {
        return {
          success: false,
          error: "Code editor is empty. Enter instructions or click 'Load Example'."
        };
      }

      for (const item of this.parsedLines) {
        this.executeLineItem(item);
      }

      this.logs.push(`\nProgram executed successfully in ${this.cycleCount} CPU cycles.`);

      return {
        success: true,
        logs: this.logs,
        registers: this.registers,
        memory: this.memory,
        stack: this.stack,
        cycles: this.cycleCount,
        pc: this.pc
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
        logs: this.logs,
        registers: this.registers,
        memory: this.memory,
        stack: this.stack,
        cycles: this.cycleCount,
        pc: this.pc
      };
    }
  }
}
