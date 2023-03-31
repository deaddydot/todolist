import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

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
      const response = await axios.get('/data.json');
      this.setState({ data: response.data });
    }
    catch(error) {
      console.error('Error fetching data: ', error);
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Container>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <Form.Check className='checkbox' type='checkbox' label={item.title} onClick={() => this.changeDisplay()} style={{display: this.state.display}}/>
            <p>Due: {item.deadline}</p>
          </React.Fragment>
        ))}
      </Container>
    );
  }
}


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