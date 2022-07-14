import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import styled from 'styled-components/macro'

import searchIcon from './search.svg'
import { filterStringAtom } from './state'
import xIcon from './x.svg'

export const SMALL_MEDIA_BREAKPOINT = '580px'
const ICON_SIZE = '18px'

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
`

const SearchInput = styled.input<{ expanded: boolean }>`
  background: no-repeat scroll 7px 7px;
  background-image: url(${searchIcon});
  background-size: 20px 20px;
  background-position: 12px center;
  background-color: ${({ theme }) => theme.bg0};
  left: 10px;
  border-radius: 12px;
  border: none;
  height: 100%;
  width: ${({ expanded }) => (expanded ? '100%' : '44px')};
  font-size: 16px;
  padding-left: 40px;
  color: ${({ theme }) => theme.text2};
  animation: ${({ expanded }) => (expanded ? 'expand 0.4s' : 'shrink 0.4s')};
  @keyframes expand {
    from {
      width: 0%;
      background-color: ${({ theme }) => theme.bg0};
    }
    to {
      width: 100%;
      background-color: ${({ theme }) => theme.bg2};
    }
  }
  @keyframes shrink {
    from {
      width: 100%;
      background-color: ${({ theme }) => theme.bg2};
    }
    to {
      width: 0%;
      background-color: ${({ theme }) => theme.bg0};
    }
  }

  :focus {
    outline: none;
    background-color: ${({ theme }) => theme.bg2};
  }
  ::placeholder {
    color: ${({ theme, expanded }) => (expanded ? theme.text3 : 'transparent')};
    @media only screen and (max-width: ${SMALL_MEDIA_BREAKPOINT}) {
      color: transparent;
    }
  }
  ::-webkit-search-cancel-button {
    appearance: none;
    height: ${ICON_SIZE};
    width: ${ICON_SIZE};
    background-image: url(${xIcon});
    margin-right: 10px;
    margin-bottom: 2px;
    background-size: ${ICON_SIZE} ${ICON_SIZE};
  }
`

export default function SearchBar() {
  const [filterString, setFilterString] = useAtom(filterStringAtom)
  const [isExpanded, setExpanded] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <SearchBarContainer>
      <SearchInput
        expanded={isExpanded}
        type="search"
        placeholder="Search token or paste address"
        id="searchBar"
        onFocus={() => setExpanded(true)}
        onBlur={() => filterString.length === 0 && setExpanded(false)}
        autoComplete="off"
        value={filterString}
        onChange={({ target: { value } }) => setFilterString(value)}
        ref={searchRef}
      />
    </SearchBarContainer>
  )
}
