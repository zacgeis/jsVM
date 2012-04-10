function e(asm) {
	//operations
	opco = ["nop", "int", "mov", "push", "pop", "pushf", "popf", "inc", "dec", "add", "sub", "mul", "div", "mod", "rem",
					"not", "xor", "or", "and", "shl", "shr", "cmp", "jmp", "call", "ret", "je", "jne", "jg", "jge", "jl", "jle", "prn" ];
	//registery
	reg = {"eax":0, "ebx":0, "ecx":0, "edx":0, "esi":0, "edi":0, "esp":0, "ebp":0, "eip":0, "r08":0, "r09":0, "r10":0,
					"r11":0, "r12":0, "r13":0, "r14":0, "r15":0, "get":function(x){if(reg[x]==undefined)return Number(x);else return reg[x]}};
	//goto map
	map = {};
	//st
	st = [];
	//memory st
	mem = [];
	//flags
	f = 0;
	//remainder
	r = 0;
						
	inst = asm.replace(/\t/g,'').split('\n');
	for(a = 0; a < inst.length; a++) {
		if(inst[a].indexOf(':')!=-1)
			map[inst[a].substring(0,inst[a].length-1)] = a;
		inst[a] = inst[a].replace(',','').split(' ');
	}
	for(i = map['start']; i < inst.length; i++) {
		if(inst[i][0]!=''&&inst[i][0].indexOf(':')==-1) {
			var a0 = inst[i][1], a1 = inst[i][2];
			switch(opco.indexOf(inst[i][0])) {
				case 0:  break;
				//interupt unhandled
				case 1:  break;
				case 2:  reg[a0] = reg.get(a1); break;
				case 3:  st.push(reg.get(a0)); break;
				case 4:  reg[a0] = st.pop(); break;
				//maybe seperate flag st
				case 5:  st.push(f); break;
				case 6:  reg[a0] = st.pop(); break;
				case 7:  reg[a0] = (reg.get(a0))+1; break;
				case 8:  reg[a0] = (reg.get(a0))-1; break;
				case 9:  reg[a0] += reg.get(a1); break;
				case 10:  reg[a0] -= reg.get(a1); break;
				case 11:  reg[a0] *= reg.get(a1); break;
				case 12:  reg[a0] /= reg.get(a1); break;
				case 13:  r = reg[a0] % reg.get(a1); break;
				case 14:  reg[a0] = r; break;
				case 15:  reg[a0] = ~(reg[a0]); break;
				case 16:  reg[a0] ^= reg.get(a1);  break;
				case 17: reg[a0] |= reg.get(a1);   break;
				case 18: reg[a0] &= reg.get(a1);   break;
				case 19: reg[a0] <<= reg.get(a1);  break;
				case 20: reg[a0] >>= reg.get(a1);  break;
				case 21: f = ((reg.get(a0) == reg.get(a1)) | (reg.get(a0) > reg.get(a1)) << 1); break;
				case 22: i = map[a0] - 1; break;
				case 23: mem.push(i); i = map[a0] - 1; break;
				case 24: i = mem.pop(); break;
				case 25: if(!!(f & 0x1))  i = map[a0] - 1; break;
				case 26: if(!(f & 0x1)) i = map[a0] - 1; break;
				case 27: if(!!(f & 0x2))  i = map[a0] - 1; break;
				case 28: if(!!(f & 0x3))  i = map[a0] - 1; break;
				case 29: if(!(f & 0x3)) i = map[a0] - 1; break;
				case 30: if(!(f & 0x2)) i = map[a0] - 1; break;
				case 31: console.log(reg.get(a0));	
			}
		}
	}
}
var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;
	console.log('Executing...\n');
	e(data);
});

