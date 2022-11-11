import { parseISO, format } from 'date-fns'
import ja from "date-fns/locale/ja";
import { FC, ReactElement } from 'react';

const Date: FC<{
    dateString: string
}> = ({ dateString }): ReactElement => {
    const date = parseISO(dateString)
    return (
        <time dateTime={dateString} >
            {format(date, "PPP (eee)", { locale: ja })}
        </time>
    )
}

export default Date;

// tutorialの書き方だとこう
// export default function Date({ dateString }: { dateString: string }) {
//     const date = parseISO(dateString)
//     return 3(
//         <time dateTime={dateString} >
//             {format(date, "PPP (eee)", { locale: ja })}
//         </time>
//     )
// }
