% Erik Sinkevic
% 2 variantas
% 2026-10-26

function varargout = specfunkc(varargin)
    if nargin == 1
        varargout{1} = varargin{1}^2;
    elseif nargin == 2
        varargout{1} = varargin{1}^2;
        if nargout > 1
            varargout{2} = varargin{2}^3;
        end
    else
        error('Reikia 1 arba 2 ivesties kintamuju.');
    end
end