import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        const { emotion: { document: { emotion } } } = this.props.emotions;
        return (
            <div>
                <table className="table table-bordered table-striped w-100 my-3">
                    <thead className="thead-light">

                        <tr >
                            <th>Emotions</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(emotion).map(data => (
                            <tr>
                                <td>{data[0]}</td>
                                <td>{data[1] ? data[1] : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}
export default EmotionTable;
