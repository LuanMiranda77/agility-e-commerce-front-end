import { MultiSelect } from 'primereact/multiselect';
import React from 'react';
import { useState } from "react"
import { Container } from './styles';

interface ComboProps {
  options: any[];
  label: string;
  selectOptions: any[];
  setFunction: Function;

}

export const ComboMultSelect: React.FC<ComboProps> = (props) => {

  const panelFooterTemplate = () => {
    const length = props.selectOptions? props.selectOptions.length : 0;
    return (
        <div className="p-py-2 p-px-3">
            <b>{length}</b> item{length > 1 ? 's' : ''} selecionado.
        </div>
    );
}

const selectedCountriesTemplate = (option: any) => {
    if (option) {
        return (
            <div className="country-item country-item-value">
                {/* <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
                <div>{option.name}</div>
            </div>
        );
    }

    return "Selecione...";
}
const countryTemplate = (option: any) => {
    return (
        <div className="country-item">
            {/* <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
            <div>{option.name}</div>
        </div>
    );
}
  return <Container className="p-field">
          <label htmlFor={props.label.toLowerCase()}>{props.label}</label>
          <MultiSelect
            value={props.selectOptions} options={props.options} onChange={(e) => props.setFunction(e.value)}
            optionLabel="nome"
            placeholder="Selecione..."
            filter
            className="multiselect-custom  p-col-12"
            panelFooterTemplate={panelFooterTemplate}
            selectedItemTemplate={selectedCountriesTemplate}
            itemTemplate={countryTemplate}

          />
  </Container>;
}