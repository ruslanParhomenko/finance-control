export type GetInitialStateType = {
  initialState: {
    EUR: number;
    USD: number;
    MDL: number;
  };
  currencyRates: {
    EUR: number;
    USD: number;
    MDL: number;
  };
};

export type InitialStateForm = {
  balanceByCurrency: {
    EUR: number;
    USD: number;
    MDL: number;
  };
  currencyRates: {
    EUR: number;
    USD: number;
    MDL: number;
  };
};
