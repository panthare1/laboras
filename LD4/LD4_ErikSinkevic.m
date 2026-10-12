clear; clc; close all;

x = linspace(-2, 1, 100);
y = linspace(-2, 1, 100);

[X, Y] = meshgrid(x, y);

Z = 1 - 2.*X.^2 - 3.*Y.^2;

figure;
surf(X, Y, Z);

shading interp;
colormap('jet');

view(78, 30); 

title('Paviršius: f(x,y) = 1 - 2x^2 - 3y^2');
xlabel('X ašis');
ylabel('Y ašis');
zlabel('Z ašis');
grid on;


x = (2 * rand(1, 200) - 1) .* sqrt(pi / 2);
y = (2 * rand(1, 200) - 1) .* sqrt(pi / 2);


x_lin = linspace(min(x), max(x), 100);
y_lin = linspace(min(y), max(y), 100);
[X, Y] = meshgrid(x_lin, y_lin);

Z = sin(X.^2 + Y.^2);

figure;
surf(X, Y, Z);

shading interp;
colormap('parula');

view(45, 30);

title('Paviršius: f(x,y) = sin(x^2 + y^2)');
xlabel('X ašis');
ylabel('Y ašis');
zlabel('Z ašis');
grid on;

