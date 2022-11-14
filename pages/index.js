import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { StyledTimeline } from "../src/components/TimeLine"
import Menu from "../src/components/Menu"

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <div style={{
                display: "flax",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
            </div>
        </>
    );
}


export default HomePage


const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .user-info{
            display: flex;
            align-items:center;
            width: 100%;
            padding: 16px 32px;
            gap:16px;
        }
  `;
const StyledBanner = styled.div`
    margin-top:50px;
    background-color: gray;
    background-image: url(${({ banner }) => banner});
    /* background-image: url(${config.banner}); */
    height: 230px;
    background-size: cover;
    background-repeat: no-repeat;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner banner={config.banner} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...propriedades }) {
    const playlistNames = Object.keys(propriedades.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    );
                                })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
}
