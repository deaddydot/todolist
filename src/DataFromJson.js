import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import JsonCheckbox from './JsonCheckbox';
import Card from 'react-bootstrap/Card';
import {Col, Row} from 'react-bootstrap';

export default class DataFromJson extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: [],
      display: 'block',
      checked: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('/data2.json');
      this.setState({ data: response.data });
    }
    catch(error) {
      console.error('Error fetching data: ', error);
    }
  }

  render() {
    const { data } = this.state;

    const categoryCount = Object.keys(data).length;
    const categoriesPerColumn = Math.ceil(categoryCount / 3);
    const columns = [[], [], []];

    Object.keys(data).forEach((category, index) => {
      const columnIndex = Math.floor(index / categoriesPerColumn);
      columns[columnIndex].push(category);
    });

    return (
      <Row style={{backgroundColor: 'var(--secondary-color)', height: '100vh'}}>
        {columns.map((column, colIndex) => (
          <Col key={`column-${colIndex}`}>
            {column.map((category, index) => (
              <React.Fragment key={`category-${index}`}>
                <Card style={{backgroundColor: `var(--${category})`, border: 'none', padding: '1rem'}}>
                  <h2>{category}</h2>
                  {data[category].map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <JsonCheckbox label={item.title} deadline={item.deadline}  showAll={this.props.showAll} />
                    </React.Fragment>
                  ))}
                </Card>
              </React.Fragment>
            ))}
          </Col>
        ))}
      </Row>
    );
  }
}

// render() {
//   const { data } = this.state;

//   return (
//     <Container>
//       {Object.keys(data).map((category, index) => (
//         <React.Fragment key={index}>
//           <h2>{category}</h2>
//           {data[category].map((item, itemIndex) => (
//             <React.Fragment key={itemIndex.id}>
//               <Form.Check className='checkbox' type='checkbox' label={item.title} onClick={() => this.changeDisplay()} style={{display: this.state.display}}/>
//               <p>Due: {item.deadline}</p>
//             </React.Fragment>
//           ))}
//         </React.Fragment>
//       ))}
//     </Container>
//   );
// }
// }


//   return (
//     <Container>
//       {data.map((item, index) => (
//         <React.Fragment key={item.id}>
//           <Form.Check className='checkbox' type='checkbox' label={item.title} onClick={() => this.changeDisplay()} style={{display: this.state.display}}/>
//           <p>Due: {item.deadline}</p>
//         </React.Fragment>
//       ))}
//     </Container>
//   );
// }


// import React from 'react';
// import Form from 'react-bootstrap/Form'

// export default class Checkbox extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { 
//         display: 'block',
//         checked: false
//       };
//     }

//     UNSAFE_componentWillReceiveProps () {
//       if (!this.props.showAll) {
//         this.setState({ display: 'block' });
//       } else if (this.props.showAll && this.state.checked) {
//         this.setState({ display: 'none' });
//       }
//     }

//     changeDisplay() {
//       const newState = !this.state.checked;
//       this.setState({ checked: newState });
//       if (!this.props.showAll && !this.state.checked) {
//         const newDisplay = this.state.display === 'block' ? 'none' : 'block';
//         this.setState({ display: newDisplay });
//       }
//     }

//     render() {
//       return (
//         // <label><input type='checkbox' className='checkbox' value='value' />{this.props.task}</label>
//         <Form.Check className='checkbox' type='checkbox' label={this.props.task} onClick={() => this.changeDisplay()} style={{display: this.state.display}}/>
//       );
//     }
// }