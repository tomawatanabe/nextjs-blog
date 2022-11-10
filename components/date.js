import { parseISO, format } from 'date-fns'
import ja from "date-fns/locale/ja";

export default function Date({ dateString }) {
    const date = parseISO(dateString)
    return (
        <time time dateTime={dateString} >
            {format(date, "PPP (eee)", { locale: ja })}
        </time>
    )

}
