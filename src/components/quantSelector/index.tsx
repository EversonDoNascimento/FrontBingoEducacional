// src/components/quantSelector/index.tsx
'use client';

import { useState } from "react";

const QuantSelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuantity(value < 1 ? 1 : value); // Garante que o valor nunca seja menor que 1
  };

  return (
    <div>
      <input
        type="number"
        id="quant-selector"
        name="quantity"
        value={quantity}
        min="1"
        onChange={handleChange}
        className="w-20 p-2 border rounded-lg text-center border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default QuantSelector;
