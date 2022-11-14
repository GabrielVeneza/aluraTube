import React from "react";
import { StyledRegisterVideo } from "./styles";

//Custom Hook
function useForm() {
    const [values, setValues] = React.useState({ titulo: "", url: "" });
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm(){
            setValues({});
        }
    };
};

export default function RegisterVideo() {
    const formCadastro = useForm();
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);
                        
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>X</button>

                            <input
                                name="titulo"
                                placeholder="Título do Vídeo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />

                            <input
                                name="url"
                                placeholder="Url do Vídeo"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false
            }
        </StyledRegisterVideo>
    )
};