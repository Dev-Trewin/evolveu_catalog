import styled from "styled-components"
import tw from "twin.macro"

const StyledForm = styled.main.attrs({
  className: "flex flex-col h-screen justify-center items-center bg-gray-100",
})`
  & {
    form {
      ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
    }
    input {
      ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
    }
    button {
      
      ${tw`  bg-white text-green-400 border-2 m-5 border-green-400 py-1 px-8 rounded-full hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline`}
    }
    
    h1 {
      font-size: 24px;
      font-weight: inherit;
    }
    
  }
`
export default StyledForm