import { useEffect, useRef, useState } from "react"
import EventBus from 'react-native-event-bus'

export const useObserver = () => {
    const containerRef = useRef()
    const headerBgc = useRef('rgba(0,0,0)')
    const [isVisible, setIsVisible] = useState(false)

    const options ={
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
    const cb = (entries) => {
        setIsVisible(entries[0].isIntersecting)
        EventBus.getInstance().fireEvent("toggleOpacity", entries[0].isIntersecting)
        
    }
    useEffect(() => {
        EventBus.getInstance().fireEvent("changeBgc", headerBgc.current)
    },headerBgc)

    useEffect(() => {
        const observer = new IntersectionObserver(cb,options)
        setTimeout(()=>{
            if(containerRef.current) observer.observe(containerRef.current)
        },1000)

        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef])

    return [containerRef,headerBgc]
}