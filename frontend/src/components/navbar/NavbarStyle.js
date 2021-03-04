import styled from "styled-components"
import tw from "twin.macro"

const NavBarStyle = styled.main.attrs({
  
})`
   a {
      ${tw`  bg-white text-green-400 border-2 m-5 border-green-400 py-1 px-2 rounded-full hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline`}
    }
  }
`
// J: What's happening with tw above?

export default NavBarStyle