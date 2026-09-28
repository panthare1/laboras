v1 = -pi/2 : 0.5 : 3*pi;

v2 = v1.^2;

v3 = sin(v1 + v2);

disp(v3.');

Z = rand(3, 3);

Z(:, 2) = [];

Z_transponowana = Z.';

A = 4;             
f = 3;             
sigma = 1;         
U1 = 2.5;          
U2 = 1.5;          
t = 0 : 0.002 : 1.5;

s = A * sin(2 * pi * f * t);
n = sigma * randn(size(t));

s_triuksmingas = s + n;


s_atrinktas = s_triuksmingas(s_triuksmingas > U1);

s_filtruotas = s_triuksmingas;
s_filtruotas(abs(s_filtruotas) < U2) = 0;

nefiltruoto_dydis = size(s_triuksmingas);

atrinktu_dydis = size(s_atrinktas);

dizdiausia_reiksme = max(s_filtruotas);
maziausia_reiksme = min(s_filtruotas);

disp('Nefiltruoto signalo dydis:');
disp(nefiltruoto_dydis);

disp('Atrinktų reikšmių (> U1) dydis:');
disp(atrinktu_dydis);

fprintf('Didžiausia filtruoto signalo įtampos reikšmė: %.4f V\n', dizdiausia_reiksme);
fprintf('Mažiausia filtruoto signalo įtampos reikšmė: %.4f V\n', maziausia_reiksme);