import styled from "styled-components";

export const Container = styled.div`

.facebook{
  background: linear-gradient(to left, var(--indigo-600) 50%, var(--indigo-700) 50%);
  background-size: 130% 100%;
  background-position: right bottom;
  transition: background-position 0.5s ease-out;
  color: #fff;
  border-color: var(--indigo-700);
  font-weight: bold;
  font-size: 18px;
  height:35px;
  border-radius: 3px;
  &:hover {
      background-position: left bottom;
      filter: brightness(0.6)
  }
  @media (max-width: 720px){
    background-size: 153% 100%;
    }
}

.facebook i {
    background-color: var(--indigo-700);
}
.facebook:focus {
    box-shadow: 0 0 0 1px var(--indigo-400);
} 

.google {
    background: linear-gradient(to left, var(--purple-600) 50%, var(--purple-700) 50%);
    background-size: 130% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    color: #fff;
    border-color: var(--purple-700);
    font-weight: bold;
    font-size: 18px;
    height:35px;
    border-radius: 3px;
    @media (max-width: 720px){
    background-size: 153% 100%;
    }
    
}
.google:hover {
    background-position: left bottom;
    filter: brightness(0.6);
}
.google i {
    background-color: var(--purple-700);
}
.google:focus {
    box-shadow: 0 0 0 1px var(--purple-400);
}
    
`