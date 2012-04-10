start:
	mov eax, 2

checkPrime:	
	mov ebx, 2

checkFactor:
	cmp eax, ebx
	je primeFound

	mod eax, ebx
	rem ecx
	cmp ecx, 0
	je nextPrime

	inc ebx
	jmp checkFactor

primeFound:
	prn eax

nextPrime:
	inc eax
	cmp eax, 50
	jl checkPrime
