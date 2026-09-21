% Erik Sinkevic EDif/02 2026-09-21

x = 1:32;
y=x.^2;
plot(x,y,'o-r',x,y/3,'xb')
title('Dvi funkcijos')
xlabel('X-ai')
ylabel('F_1 [-o-] | F_2 [-x-]')


N = 2; 

vektorius = (N+1) : 0.5 : (N+4);

A = [N  , N+1, N+2; 
    N+3, N+4, N+5; 
    N+6, N+7, N+8];

A_a = A(3, 2);

A_b = A(2:3, 1:2);

A_c = A([1, 3], [1, 3]);

vektorius_3 = vektorius(1:3); 

A_su_eilute = [A; vektorius_3];

A_su_stulpeliu = [A, vektorius_3'];

disp('Matrica A:');
disp(A);
disp('Atrinkti elementai a):');
disp(A_a);
disp('Atrinkti elementai b):');
disp(A_b);
disp('Atrinkti elementai c):');
disp(A_c);
disp('Matrica A su prijungta eilute:');
disp(A_su_eilute);