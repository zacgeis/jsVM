fact:
	push eax
	push ecx
	push ebp
	mov ebp, esp
	mov ebx, 1
	cmp eax, 1
	jle end_fact
	mov ecx, eax
	dec eax
	call fact
	mul ebx, ecx
end_fact:
	pop ebp
	pop ecx
	pop eax
	ret

start:
	mov eax, 0
loop:
	inc eax
	call fact
	prn ebx
	cmp eax, 10
	jl loop