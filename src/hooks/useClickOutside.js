import {useEffect} from 'react'

export default function useClickOutside(ref, fn) {
    useEffect(() => {
        function handleClickOutside(e) {
            if(ref.current && !ref.current.contains(e.target)) {
                fn()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, fn])
}