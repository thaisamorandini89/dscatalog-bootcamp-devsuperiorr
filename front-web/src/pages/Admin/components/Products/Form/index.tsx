import { makeRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/BaseForm';
import React, { useState } from 'react';
import './styles.scss';

type FormState = {
    name: string;
    price:string;
    category:string;
    description: string;
}

const Form = () => {
    const [formData, setformData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name  = event.target.name;
        const value = event.target.value;

        setformData(data => ({ ...data, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://images5.kabum.com.br/produtos/fotos/26705/26705_index_g.jpg',
            categories: [{ id: formData.category }]
        }

        makeRequest({url: '/products', method: 'POST', data: payload }).then(() => {
            setformData({name: '', category: '', price: '', description: '' })
        });
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
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço do Produto"/>
                    </div>
                    <div className="col-6">
                        <textarea 
                            value={formData.description}
                            name="description"
                            className="form-control" 
                            onChange={handleOnChange}
                            cols={30} 
                            rows={10}/>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;