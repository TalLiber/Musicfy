
export const SearchList = ({ searchItems }) => {

  return (
    <div className='search-list'>
      {searchItems.map((item) => {
        return (
          <div>

          <p>{item.release_date}</p>
          <p>{item.title}</p>
          <p>{item.artists}</p>
          <p>{item.imgUrl}</p>
          </div>
        )
      })}
    </div>
  )
}