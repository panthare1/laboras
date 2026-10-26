% Erik Sinkevic
% 2 variantas
% 2026-10-26

studentai(1).vardas = 'Erik';
studentai(1).pavarde = 'Sinkevic';
studentai(1).grupe = 1;
studentai(1).pazymiai = [9, 8, 10, 7, 9, 10];

studentai(2).vardas = 'Jonas';
studentai(2).pavarde = 'Jonaitis';
studentai(2).grupe = 1;
studentai(2).pazymiai = [8, 9, 7, 10];

studentai(3).vardas = 'Ona';
studentai(3).pavarde = 'Onaite';
studentai(3).grupe = 1;
studentai(3).pazymiai = [10, 10, 9, 9];

studentai(2).pazymiai(3) = 10;

disp(studentai);

format bank;
disp('   Suma      Bankas 1 (10%)   Bankas 2 (15%)   Bankas 3 (20%)');

men_sk = 12;

for suma = 10000 : 1000 : 20000
    imoka1 = (suma * (1 + 0.10)) / men_sk;
    imoka2 = (suma * (1 + 0.15)) / men_sk;
    imoka3 = (suma * (1 + 0.20)) / men_sk;

    eilute = sprintf('%9.2f     %14.2f     %14.2f     %14.2f', suma, imoka1, imoka2, imoka3);
    disp(eilute);
end