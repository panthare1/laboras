% Erik Sinkevic
% 2 variantas
% 2026-10-26



x = input('Ivesti x: ');
y = input('Ivesti y: ');

for i = 1:20
    m = randi([1, x]);
    n = randi([1, y]);

    A = zeros(x, y);
    A(m, n) = NaN;

    disp(A);

    pause(0.5);
    clc;
end