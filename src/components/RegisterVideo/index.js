import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

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

                          // Contrato entre o nosso Front e o BackEnd
                          supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
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