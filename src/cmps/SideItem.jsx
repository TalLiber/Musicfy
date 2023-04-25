import SvgIcon from './SvgIcon'

export const SideItem = ({ categ, selected, directTo }) => {

  const getClass = () => {
    let classStr = `${categ.icon ? 'nav-categ' : 'user-categ'} ${categ.icon || ''}`
    if (categ.path === '/' && selected === 'home' || categ._id === selected || categ.path?.slice(1) === selected) classStr += ' selected'
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