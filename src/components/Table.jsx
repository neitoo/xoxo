const Table = ({data, isAdmin, headers, showActions = false, textActions = "", onDataClick}) => {

    const handleClick = (item) => {
        if(onDataClick)
            onDataClick(item);
    };

    return (
        <table>
            <thead>
                <tr>
                {headers.map((header) => (
                    <th key={header.key}>{header.label}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {headers.map((header) => (
                            <td key={`${item.id}-${header.key}`}>
                                {header.key === 'actions' ? (
                                    <button disabled={!isAdmin}  onClick={(e) => {handleClick(item)}}>{textActions}</button>
                                ) : (
                                    <span dangerouslySetInnerHTML={{__html: item[header.key]}}></span>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;