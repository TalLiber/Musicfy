import { categoryService } from "../../services/category.service"

export function getCategoryPlaylists(categoryId) {
    return async (dispatch) => {
      try {
        const categoryPlaylists = await categoryService.getById(categoryId)
        dispatch({ type: 'SET_CATEGORY_PLAYLISTS', playlists: categoryPlaylists })
      } catch (err) {
        console.log('err:', err)
      }
    }
  }
  
export function loadCategories() {

    return async(dispatch, getState) => {
        try {
            console.log('getting categories');
            const filterBy = getState().categoryModule.filterBy
            const categories = await categoryService.query(filterBy)
            console.log('categories:', categories)
            dispatch({ type: 'SET_CATEGORIES', categories })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addCategory() {

    let category = categoryService.getEmptyCategory()
    return async(dispatch) => {
        try {
            category = await categoryService.save(category)
            dispatch({ type: 'ADD_CATEGORY', category })
            return category
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeCategory(categoryId) {

    return async(dispatch) => {
        try {
            const categories = await categoryService.remove(categoryId)
            dispatch({ type: 'REMOVE_CATEGORY', categoryId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: {...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

// export function get