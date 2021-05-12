import BaseForm from 'pages/Admin/BaseForm';
import React, { useState } from 'react';
import './styles.scss';

type FormState = {
    name: string;
    price:string;
    category:string;
}

const Form = () => {
    const [formData, setformData] = useState<FormState>({
        name: 'Computador',
        price: '50',
        category: 'eletronicos'
    });
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name  = event.target.name;
        const value = event.target.value;

        setformData(data => ({ ...data, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(formData);
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title = "cadastrar um produto" >
                <div className="row">
                    <div className="col-6">
                        <input 
                            value={formData.name}
                            name="name"
                            type="text" 
                            className="form-control mb-5" 
                            onChange = {handleOnChange}
                            placeholder="Nome do Produto"
                        />
                        <select
                            value={formData.category} 
                            className="form-control mb-5" 
                            name="category"
                            onChange={handleOnChange}
                        >
                            <option value="livros">Livros</option>
                            <option value="computadores">Computadores</option>
                            <option value="eletronicos">Eletrônicos</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço do Produto"/>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;