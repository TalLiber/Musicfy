import SvgIcon from './SvgIcon'

export const SideItem = ({ categ, selected, directTo }) => {

  const isSelected = () => {
    let classStr = `nav-categ ${categ.icon}`
    if (categ.path === '' && selected === 'home' || categ.path === selected) classStr += ' selected'
    return classStr
  }

  const getIcon = () => {
    return categ.icon === selected ? selected + '-full' : categ.icon
  }
  return (
    <div onClick={() => directTo(categ.path)} className={isSelected()}>
      <i className='side-icon'>{SvgIcon({ iconName: getIcon() })}</i>
      <p>{categ.title}</p>
    </div>

  )
}