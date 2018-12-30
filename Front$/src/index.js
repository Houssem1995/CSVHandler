import React from 'react';
import { render } from 'react-dom';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import 'bootstrap/dist/css/bootstrap.css';
const sampleData = `ncodpers , added_products 
15889,Direct Debit e-account particular Account Payroll Account Pensions Taxes Long-term deposits
15890,particular Account Long-term deposits Taxes Current Accounts Securities Funds Mortgage
15892,Payroll Account Pensions particular Account Funds particular Plus Account Payroll Pensions
15893,Direct Debit particular Account Pensions Payroll Account Credit Card Taxes Current Accounts
15894,Payroll Account particular Account Long-term deposits particular Plus Account Funds Pensions Mortgage
15895,particular Account Payroll Account Pensions particular Plus Account Payroll Long-term deposits Funds
15896,Direct Debit Payroll Account Pensions Credit Card Taxes Long-term deposits Payroll
15897,Long-term deposits particular Plus Account Current Accounts Payroll Mortgage Medium-term deposits Home Account
15898,particular Account Direct Debit Current Accounts e-account Credit Card particular Plus Account Payroll Account
15899,e-account Payroll Account Pensions Credit Card Long-term deposits Taxes Payroll
15900,Payroll Account Pensions Credit Card Current Accounts Payroll e-account particular Plus Account
15901,Payroll Account particular Account Pensions Taxes Long-term deposits Payroll Pensions
15902,Direct Debit e-account Credit Card particular Account Payroll Account Pensions Taxes
15903,Direct Debit Payroll Account Pensions Taxes e-account particular Plus Account Payroll
15906,e-account Credit Card Taxes Current Accounts Securities Payroll Funds
15907,e-account Payroll Account Pensions Long-term deposits Payroll particular Plus Account Mortgage
15908,particular Account Long-term deposits Taxes Funds Mortgage Medium-term deposits Home Account
15910,particular Account Direct Debit Current Accounts e-account particular Plus Account Credit Card Payroll Account
15911,particular Account Pensions Taxes Payroll Current Accounts particular Plus Account Funds
15913,particular Account Payroll Account Pensions Taxes Payroll e-account particular Plus Account
15914,particular Account Taxes Securities Long-term deposits Funds particular Plus Account Pensions
15915,particular Account Current Accounts Direct Debit e-account particular Plus Account Credit Card Payroll Account
15916,particular Account Pensions Long-term deposits Current Accounts Funds Payroll Mortgage
15917,Credit Card Payroll Account Pensions Taxes e-account Payroll particular Plus Account
15918,particular Account Current Accounts Taxes particular Plus Account Securities Long-term deposits Funds
15919,e-account particular Account Payroll Account Pensions Credit Card Securities particular Plus Account
15920,Credit Card Payroll Account Pensions Payroll particular Plus Account e-account Long-term deposits
15921,e-account Pensions Payroll Account Taxes particular Plus Account Payroll Mortgage
15922,Pensions Payroll Account Credit Card Taxes e-account particular Plus Account Payroll
15923,particular Account Long-term deposits Current Accounts particular Plus Account Securities Funds Pensions
15924,particular Account Credit Card Payroll Account Pensions Taxes Payroll particular Plus Account
15925,Direct Debit Pensions Payroll Account Taxes e-account particular Plus Account Payroll
15926,Direct Debit Payroll Account Pensions Credit Card Taxes e-account particular Plus Account
15927,e-account Pensions Payroll Account particular Account Credit Card Long-term deposits Taxes
15928,Direct Debit e-account Credit Card Payroll Account Taxes Pensions Securities
15929,particular Account Pensions Payroll Account Taxes Payroll Long-term deposits Funds
15930,Direct Debit e-account Credit Card particular Account Payroll Account Taxes Pensions
15932,Direct Debit particular Account Pensions Payroll Account Credit Card Taxes e-account
15933,Direct Debit e-account Credit Card particular Plus Account Taxes Payroll Account Pensions
15934,particular Account Credit Card Payroll Account Taxes Pensions Payroll particular Plus Account
15935,Credit Card Payroll Account Pensions Taxes Securities Funds particular Plus Account
15936,particular Account Direct Debit Current Accounts e-account particular Plus Account Credit Card Pensions
15937,Pensions Credit Card particular Account Long-term deposits Payroll Mortgage Home Account
15938,Payroll Account Pensions Taxes e-account Payroll Securities Mortgage
15939,Credit Card Payroll Account Pensions particular Account Taxes particular Plus Account Payroll
15940,Payroll Account Pensions Credit Card Taxes particular Plus Account Payroll Funds
15941,Current Accounts Direct Debit e-account Credit Card particular Plus Account Taxes Payroll Account
15942,particular Account Direct Debit Current Accounts e-account particular Plus Account Credit Card Pensions
15943,Direct Debit particular Account Payroll Account Pensions Taxes Payroll e-account
15944,Credit Card Payroll Account Pensions Payroll e-account Securities Long-term deposits
15945,particular Account Current Accounts Direct Debit e-account Credit Card particular Plus Account Payroll Account
15947,Direct Debit e-account particular Account Payroll Account Pensions Credit Card Taxes
15948,Direct Debit particular Account Credit Card Current Accounts Payroll Account Pensions Taxes
15949,Payroll Account Pensions e-account Payroll Securities Long-term deposits Funds
15950,particular Account Pensions Payroll Account Credit Card Current Accounts e-account particular Plus Account
15951,particular Account Direct Debit e-account Credit Card particular Plus Account Payroll Account Pensions
15952,particular Account Credit Card Payroll Account Pensions Payroll particular Plus Account e-account
15954,Credit Card Payroll Account particular Account Pensions Taxes Payroll Home Account
15956,Payroll Account Credit Card Pensions Taxes Payroll e-account Securities

`;

class App extends React.Component {
  state = {
    csvData: null,
    value: 0
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    //this.setState({ value: this.state.value });
    console.log(this.state.value);
  };
  handleClick = () => {
    fetch('http://localhost:5000/' + this.state.value.toString())
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          sampleData:
            `ncodpers , added_products \n` +
            json.ncodpers +
            ',' +
            json.added_products,
          csvData:
            `ncodpers , added_products \n` +
            json.ncodpers +
            ',' +
            json.added_products
        });
        console.log('parsed json', json);
      })
      .catch(ex => {
        console.log('parsing failed', ex);
      });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <ReactFileReader
          multipleFiles={false}
          fileTypes={['.csv']}
          handleFiles={this.handleFiles}
        >
          <button className="btn">Upload</button>
        </ReactFileReader>
        <label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.value}
          />
        </label>
        <button className="btn" onClick={this.handleClick}>
          Get
        </button>
        <CsvToHtmlTable
          data={this.state.csvData || sampleData}
          csvDelimiter=","
          tableClassName="table table-striped table-hover"
        />
      </div>
    );
  }
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = e => {
      // Use reader.result
      this.setState({
        csvData: reader.result
      });
    };
    reader.readAsText(files[0]);
  };
}

render(<App />, document.getElementById('root'));
