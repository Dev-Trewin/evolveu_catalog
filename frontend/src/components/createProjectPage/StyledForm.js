import styled from "styled-components"
import tw from "twin.macro"

const StyledForm = styled.main.attrs({
  className: "",
})`
  & {
    form {
      ${tw``}
    }
    input {
      ${tw`bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500`}
    }
    button {
      ${tw``}
    }
    label {
      ${tw`block text-gray-600  text-left mb-1 pr-4`}
    }
    textarea {
      ${tw`bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500`}
    }
    select {
      ${tw`bg-gray-100  border-2 border-gray-200 rounded w-full py-2 pl-2  text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-teal-500`}
    }
    button {
      ${tw`object-right  bg-white text-green-400 border-2 border-green-400 py-1 px-2 rounded-full hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline`}
    }
    .oneThird {
      ${tw`w-1/3 flex-initial mt-2`}
    }
    .twoThird {
      ${tw`w-2/3  flex-1 mt-2`}
    }
    .container {
      ${tw` w-full bg-gray-100 border-2 `}
    }
  }
`
export default StyledForm