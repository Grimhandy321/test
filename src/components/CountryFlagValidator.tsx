

export const CountryFlagValidator = ({code}:{code :string}) => {
    return(
        <img src={"https://countryflagsapi.netlify.app/flag/"+code + ".svg"} width={"40px"} height={"60px"}></img>
    )
}