import SvgIcon from './SvgIcon'

export const SideItem = ({ categ, selected, directTo }) => {

  const getClass = () => {
    let classStr = `${categ.icon ? 'nav-categ' : 'user-playlist'} ${categ.icon}`
    if (categ.path === '/' && selected === 'home' || categ.path === selected || categ._id === selected) classStr += ' selected'
    return classStr
  }

  const getIcon = () => {
    console.log(categ);
    return categ.icon === selected ? selected + '-full' : categ.icon
  }
  return (
    <div onClick={() => directTo(categ.path || `playlist/${categ._id}`)} className={getClass()}>
      {categ.icon && <i className='side-icon'>{SvgIcon({ iconName: getIcon() })}</i>}
      <p>{categ.name}</p>
    </div>

  )
}