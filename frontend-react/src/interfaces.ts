export type CreatePackData = {
  name?: string;
  size?: number;
  price?: number;
  availableFrom?: number;
};

export type PopulatePackData = {
  packId?: number;
  comboMappings?: Array<Mapping>;
  amount?: number;
};

export type Mapping = {
  compilationId: number;
  amountOf: number;
};
