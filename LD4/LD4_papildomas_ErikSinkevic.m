
clear; clc; close all;

x = linspace(-2, 2, 100);
y = linspace(-2, 2, 100);

[X, Y] = meshgrid(x, y);

Z = 1 - (X.^2 + Y.^2);


subplot(1, 3, 1);
surf(X, Y, Z, 'FaceColor', [0.3 0.6 0.9], 'EdgeColor', 'none'); 
camlight;      
lighting phong; 
title('a) Su apšvietimu (camlight)');
xlabel('X'); ylabel('Y'); zlabel('Z');
grid on;
axis tight;

subplot(1, 3, 2);
surfc(X, Y, Z); 
title('b) Su kontūru pagrinde (surfc)');
xlabel('X'); ylabel('Y'); zlabel('Z');
grid on;
axis tight;

subplot(1, 3, 3);
surf(X, Y, Z); 
title('c) Paprastas paviršius');
xlabel('X'); ylabel('Y'); zlabel('Z');
grid on;
axis tight;

sgtitle('Papildoma užduotis: z(x,y) = 1 - (x^2 + y^2)');