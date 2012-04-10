start:
	mov eax, 0
	mov ebx, 1
	
loop:
	prn eax
	prn ebx
	add eax, ebx
	add ebx, eax
	
	cmp eax, 10000
	jmp loop
	
end: