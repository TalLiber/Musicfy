import SvgIcon from './SvgIcon'

export const SideItem = ({ categ, selected, directTo }) => {

  const getClass = () => {
    let classStr = `${categ.icon ? 'nav-categ' : 'user-categ'} ${categ.icon || ''}`
    if (categ.path === '/' && selected === 'home' || categ.spotifyId === selected || categ.spotifyId+categ.id === selected || categ.path?.slice(1) === selected) classStr += ' selected'
    return classStr
  }

  const getIcon = () => {
    return categ.icon === selected ? selected + '-full' : categ.icon
  }
  return (
    <div onClick={() => directTo(categ.path || `/Playlist/${categ._id || (categ.spotifyId === '1234s' ? (categ.spotifyId+categ.id) : categ.spotifyId)}`)} className={getClass()}>
      {categ.icon && <i className='side-icon'>{SvgIcon({ iconName: getIcon() })}</i>}
      <div className='img-container'>
        {categ.image && <img className='side-img' src={categ.image}/>}
      </div>
      <p>{categ.name}</p>
    </div>

  )
}