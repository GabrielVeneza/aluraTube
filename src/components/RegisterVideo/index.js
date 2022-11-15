import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

//Custom Hook
function useForm() {
    const [values, setValues] = React.useState({ titulo: "", url: "", playlist: "" });
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
        clearForm() {
            setValues({});
        }
    };
};

const PROJECT_URL = "https://sxaztnnrxvmkwysndwrv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YXp0bm5yeHZta3d5c25kd3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NjE1OTEsImV4cCI6MTk4NDAzNzU5MX0.GeaSgjroxevuf2377ovOSFFwI-xObqr0C3jTUb97meg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


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
                        window.location.reload(false)
                        // Contrato entre o nosso Front e o BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: formCadastro.values.playlist,
                        })
                            .then((oqueveio) => {
                                console.log(oqueveio);
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>X</button>

                            <h2>Cadastro de Vídeos</h2>
                            <br />
                            <input
                                required
                                name="titulo"
                                placeholder="Título do Vídeo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />

                            <input
                                required
                                name="url"
                                placeholder="Url do Vídeo"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                required
                                name="playlist"
                                placeholder="playlist do Vídeo: Músicas, Jogos, etc"
                                value={formCadastro.values.playlist}
                                onChange={formCadastro.handleChange}
                            />
                            <div className="thumbPreview">
                                <h2>Preview da thumbnail</h2>
                                <img src={getThumbnail(formCadastro.values.url)} />
                            </div>

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