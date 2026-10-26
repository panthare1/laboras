function y_nelygu_nuliui
global x y
idx = (x ~= 0);
y(idx) = sin(x(idx)) ./ x(idx);
end