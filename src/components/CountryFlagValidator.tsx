

export const CountryFlagValidator = ({code}:{code :string}) => {
    return(
        <img src={"https://countryflagsapi.netlify.app/flag/"+code + ".svg"} width={"60px"} height={"40px"}></img>
    )
}