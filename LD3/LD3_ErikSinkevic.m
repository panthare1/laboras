% 1 a) ir c) dalis: Funkcijos f(x) = x^3 + tan(x) braižymas
figure(1);
x = 0 : 0.1 : 2*pi;
y = x.^3 + tan(x);

plot(x, y, 'bo-', 'MarkerFaceColor', 'b'); % Mėlyna spalva, 'o' markeris
grid on;
title('Funkcijos f(x) = x^3 + tan(x) grafikas');
xlabel('x reikšmės');
ylabel('f(x) reikšmės');
axis([0 2*pi min(y) max(y)]);
legend('f(x) = x^3 + tan(x)', 'Location', 'best');

% 1 b) ir c) dalis: Eksponentinių funkcijų braižymas
figure(2);
x = linspace(0, 5, 100); % Intervalą galite pasirinkti pagal poreikį
y1 = exp(x);
y2 = exp(3*x);
y3 = exp(5*x);

plot(x, y1, 'r-', 'LineWidth', 1.5); hold on;
plot(x, y2, 'g-', 'LineWidth', 1.5);
plot(x, y3, 'b-', 'LineWidth', 1.5);
hold off;

grid on;
title('Eksponentinių funkcijų grafikai');
xlabel('x reikšmės');
ylabel('y reikšmės');
legend('f(x) = e^x', 'f(x) = e^{3x}', 'f(x) = e^{5x}', 'Location', 'northwest');
axis([min(x) max(x) min(y1) max(y3)]);


atsitiktiniai_balai = randi([4, 10], 6, 4); 

figure(3);
subplot(2, 1, 1);
bar(atsitiktiniai_balai, 'grouped');
grid on;
title('Studentų egzaminų rezultatai (vertikalūs stulpeliai)');
xlabel('Studentas');
ylabel('Balai');
axis([0.5 6.5 0 10]);
legend('1 egz.', '2 egz.', '3 egz.', '4 egz.', 'Location', 'northeastoutside');

subplot(2, 1, 2);
bar(atsitiktiniai_balai, 'stacked');
grid on;
title('Studentų egzaminų rezultatai (diskreciame / suminiame formate)');
xlabel('Studentas');
ylabel('Balai');
axis([0.5 6.5 0 40]);
legend('1 egz.', '2 egz.', '3 egz.', '4 egz.', 'Location', 'northeastoutside');

% Papildoma užduotis: Signalų grafinis atvaizdavimas
A = [2 8 3 9 1 7 5 10 4 6]; % Pradinis signalas (pavyzdys)
B = [A(end:-1:6), A(1:5)];    % Filtruotas signalas (pavyzdys)

U1 = 4; % Pirmo filtravimo riba
U2 = 8; % Antro filtravimo riba

figure(4);

% Papildoma užduotis: Signalų grafinis atvaizdavimas
A = [2 8 3 9 1 7 5 10 4 6];
B = [A(end:-1:6), A(1:5)];

U1 = 4;
U2 = 8;

figure('Name', 'Signalų analizė', 'Color', 'white');

% 1. Pirmas grafikas (Viršutinis)
subplot(2, 1, 1);
plot(A, 'k-', 'LineWidth', 1.5); 
hold on;
plot(B, 'b.', 'MarkerSize', 14); 
yline(U1, 'r--', 'LineWidth', 1.2); 
yline(U2, 'r--', 'LineWidth', 1.2); 
hold off;

grid on;
title('Pradinis ir filtruotas signalas bei filtravimo ribos');
xlabel('Indeksas');
ylabel('Įtampa');
legend('Pradinis signalas', 'Filtruotas signalas', 'Ribos U_1, U_2', ...
       'Location', 'southeast', 'AutoUpdate', 'off');

% 2. Antras grafikas (Apatinis)
subplot(2, 1, 2);
virsinantys_indeksai = find(A > U1);

plot(1:length(A), A, 'k-', 'LineWidth', 1.2); 
hold on;
plot(virsinantys_indeksai, A(virsinantys_indeksai), 'bo', ...
     'MarkerFaceColor', 'c', 'MarkerSize', 6);

min_val = min(A);
max_val = max(A);
min_ind = find(A == min_val);
max_ind = find(A == max_val);

plot(min_ind, min_val, 'gd', 'MarkerSize', 9, 'MarkerFaceColor', 'g'); 
plot(max_ind, max_val, 'gd', 'MarkerSize', 9, 'MarkerFaceColor', 'g');
hold off;

grid on;
title('Pradinio signalo reikšmės viršijančios U_1 ribą');
xlabel('Indeksas');
ylabel('Įtampa');
legend('Signalas', 'Viršija U_1', 'Min / Max reikšmės', ...
       'Location', 'southeast', 'AutoUpdate', 'off');