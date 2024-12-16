import React, { useState } from 'react';
import { Copy, PlusCircle, Trash2 } from 'lucide-react';

const TokenizeCopilot = () => {
  const [inputFields, setInputFields] = useState(['']);
  const [tokenizedTexts, setTokenizedTexts] = useState([]);
  const [isPricingTableEnabled, setIsPricingTableEnabled] = useState(false);

  const addInputField = () => {
    setInputFields([...inputFields, '']);
  };

  const removeInputField = (index) => {
    const newInputFields = inputFields.filter((_, i) => i !== index);
    setInputFields(newInputFields);
  };

  const handleInputChange = (index, value) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;
    setInputFields(newInputFields);
  };

  const generateTokens = () => {
    const tokens = inputFields
      .filter(text => text.trim() !== '')
      .map(text => {
        const formattedText = text.trim().toUpperCase().replace(/\s+/g, '_');
        return `#[${formattedText}]#`;
      });
    
    setTokenizedTexts(tokens);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const pricingTableTokens = [
    "#[TABLE::START::SUBSCRIPTIONS]#",
    "#[ROW::PRODUCT_NAME]#", 
    "#[TABLE::END::SUBSCRIPTIONS]#"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tokenize Copilot
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto text-center mb-8">
          The first step in creating an Our Paper Template is to tokenize the document. 
          This formatting change allows LinkSquares to draft contracts faster. 
          <i> Please enter all information that will be entered into your contract (ie. Effective Date) in the below text box.</i>
        </p>
      </header>
      
      <div className="w-full max-w-5xl flex space-x-8">
        {/* Left Column: Input */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              {inputFields.map((field, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="Enter legal information"
                    className="flex-grow p-2 border rounded transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  {inputFields.length > 1 && (
                    <button 
                      onClick={() => removeInputField(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              <button 
                onClick={addInputField}
                className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
              >
                <PlusCircle className="mr-2" /> Add Input
              </button>
              
              <button 
                onClick={generateTokens}
                disabled={!inputFields.some(field => field.trim() !== '')}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Tokens
              </button>
            </div>
          </div>

          {/* Pricing Table Configuration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Pricing Table Configuration
              </h2>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={isPricingTableEnabled}
                    onChange={() => setIsPricingTableEnabled(!isPricingTableEnabled)}
                  />
                  <div className={`
                    w-10 h-4 rounded-full shadow-inner
                    ${isPricingTableEnabled ? 'bg-orange-500' : 'bg-gray-300'}
                  `}></div>
                  <div className={`
                    dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full 
                    shadow transition-transform duration-300 ease-in-out
                    ${isPricingTableEnabled ? 'transform translate-x-full' : ''}
                  `}></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Right Column: Tokenized Output */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Tokenized Text</h2>
            
            {tokenizedTexts.length > 0 ? (
              <div className="space-y-3">
                {tokenizedTexts.map((token, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-orange-50 p-3 rounded"
                  >
                    <span className="text-gray-700 mr-4">{token}</span>
                    <button 
                      onClick={() => copyToClipboard(token)}
                      className="text-orange-600 hover:text-orange-800 transition-colors"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center italic">
                Generate tokens to see results
              </p>
            )}
          </div>

          {/* Pricing Table Tokens */}
          {isPricingTableEnabled && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Pricing Table Tokens
              </h2>
              <div className="space-y-3">
                {pricingTableTokens.map((token, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-orange-50 p-3 rounded"
                  >
                    <span className="text-gray-700 mr-4">{token}</span>
                    <button 
                      onClick={() => copyToClipboard(token)}
                      className="text-orange-600 hover:text-orange-800 transition-colors"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guidance paragraph */}
      {tokenizedTexts.length > 0 && (
        <div className="mt-6 max-w-5xl w-full bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-blue-800">
            Now that you have your tokens, please copy them and paste them into your word document. 
            Please contact your Implementation Consultant if you have any questions.
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenizeCopilot;
