% Erik Sinkevic
% 2 variantas
% 2026-10-26

clear; clc; close all;

global x y

x = 2*pi : -0.1 : -2*pi;
y = zeros(size(x));

y_nelygu_nuliui;
y_lygu_nuliui;

plot(x, y, '--y*');
xlabel('x'); ylabel('y(x)');
title('y(x) = sin(x)/x, kai x \neq 0; y = 1, kai x = 0');
grid on

whos
whos global