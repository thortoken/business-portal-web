import React from 'react';
import _ from 'underscore';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formFieldConstants } from './form/formFields';
import { fieldIsValid } from './form/utilityFunctions.js';
import { submitInfo } from '../redux/actions/status';
class UserInfo extends React.Component {
  state = {
    dollar_contribution: '',
    neo_wallet: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    country: '',
    us_accredited: false,
    street_address: '',
    street_address_2: '',
    city: '',
    zip_code: '',
    phone: '',
    tooltipMsg: 'Please fill in this field.',
    tooltipTopCSS: 0,
    toolTipDisplay: 'none',
  };
  renderInvestorCheck() {
    return (
      <div className="us-accredited-div">
        <label htmlFor="dollar_contribution">
          Are you an&nbsp;
          <a href="https://www.sec.gov/files/ib_accreditedinvestors.pdf" target="_blank">
            Accredited Investor
          </a>
          &nbsp;in United States?
        </label>
        <input
          type="checkbox"
          name="us_accredited"
          value={this.state.us_accredited}
          onChange={this.handleInputChange}
        />
        <label className="inline-label">Yes</label>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div data-w-id="fd910b6f-3c58-69d2-e4e0-fff6f11f0166" className="whitelist-reg non-fixed">
          <div className="part-2">
            <div className="wlp-image-div">
              <img
                src="images/TokenSale_ContributionInfo.png"
                width="400"
                srcSet="images/TokenSale_ContributionInfo-p-500.png 500w, images/TokenSale_ContributionInfo.png 800w"
                sizes="(max-width: 479px) 84vw, 400px"
                className="ts-process"
              />
            </div>
            <h1 className="small-h1">Whitelist Contribution Information</h1>
            <div className="sm-text">
              Please fill in the following information. All fields are required.
            </div>
            <div className="info-form w-form">
              <form
                id="wf-form-Contribution-Info"
                className="contribution-info"
                name="wf-form-Contribution-Info"
                data-name="Contribution Info">
                <label htmlFor="dollar_contribution">
                  What dollar amount do you plan to contribute in NEO/GAS?
                </label>
                <input
                  ref="dollar_contribution"
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="dollar_contribution"
                  data-name="NEO contribution"
                  placeholder="$500"
                  id="dollar_contribution"
                  onChange={this.handleInputChange}
                  value={this.state.neo_contribution}
                />
                <label htmlFor="neo_wallet">
                  What NEO public address will you be sending from?
                </label>
                <input
                  type="text"
                  className="style-input w-input"
                  ref="neo_wallet"
                  maxLength="256"
                  name="neo_wallet"
                  data-name="NEO"
                  placeholder="Enter your public NEO address"
                  id="neo_wallet"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.neo_wallet}
                />
                <label htmlFor="First-Name">First Name</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="first_name"
                  ref="first_name"
                  data-name="First Name"
                  placeholder="John"
                  id="first_name"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.first_name}
                />
                <label htmlFor="Middle-Name">Middle Name</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="middle_name"
                  ref="middle_name"
                  data-name="Middle Name"
                  placeholder="Doe"
                  id="middle_name"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.middle_name}
                />
                <label htmlFor="Last-Name">Last Name</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="last_name"
                  ref="last_name"
                  data-name="Last Name"
                  placeholder="Smith"
                  id="last_name"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.last_name}
                />
                <label htmlFor="Country">Country</label>
                {this.countryList()}

                {this.state.country === 'United States' ? this.renderInvestorCheck() : null}

                <label htmlFor="Street-Address">Street Address</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  ref="street_address"
                  name="street_address"
                  data-name="Street Address"
                  placeholder="Smith"
                  id="street_address"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.street_address}
                />
                <label htmlFor="Street-Address-2">Street Address 2</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="street_address_2"
                  ref="street_address_2"
                  data-name="Street Address 2"
                  placeholder="Smith"
                  id="street_address_2"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.street_address_2}
                />
                <label htmlFor="City">City</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="city"
                  ref="city"
                  data-name="City"
                  placeholder="City"
                  id="city"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.city}
                />
                <label htmlFor="Zip-Code">Zip code</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="zip_code"
                  ref="zip_code"
                  data-name="Zip Code"
                  placeholder="12345"
                  id="zip_code"
                  required=""
                  onChange={this.handleInputChange}
                  value={this.state.zip_code}
                />
                <label htmlFor="Phone">Phone</label>
                <input
                  type="text"
                  className="style-input w-input"
                  maxLength="256"
                  name="phone"
                  ref="phone"
                  data-name="phone"
                  placeholder="(555) 555-5555"
                  id="phone"
                  required=""
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  data-wait="Please wait..."
                  className="primary-btn"
                  onClick={this.submitForm}
                />
                <div
                  className="tooltip"
                  style={{
                    top: this.state.tooltipTopCSS,
                    display: this.state.toolTipDisplay,
                  }}>
                  <img src="images/please_fill_in.png" width="50" className="warning-icon" />
                  <div className="warning-text">{this.state.tooltipMsg}</div>
                  <div className="tooltip-arrow" />
                </div>
              </form>
              <div className="success-msg w-form-done">
                <div className="text-block-3">Thank you! Your submission has been received!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      toolTipDisplay: 'none',
    });
  };
  submitForm = e => {
    e.preventDefault();
    if (this.validateForm()) {
    }
  };
  validateForm = () => {
    let fieldsAreValid = true,
      info = {};
    _.each(this.state, (value, key, obj) => {
      if (formFieldConstants.hasOwnProperty(key)) {
        let fieldConst = formFieldConstants[key];
        if (!fieldIsValid(value, fieldConst.func) && fieldsAreValid) {
          fieldsAreValid = false;
          let node = document.getElementById(key);
          this.setState({
            tooltipMsg: fieldConst.errorMsg,
            tooltipTopCSS: fieldConst.tooltipCSS,
            toolTipDisplay: 'block',
          });
          node.scrollIntoView();
          window.scrollBy(0, -50);
        } else {
          info[key] = value;
        }
      }
    });
    if (fieldsAreValid) {
      this.props.submitInfo(info);
    }
  };
  countryList = () => {
    return (
      <select
        id="country"
        name="country"
        data-name="Country"
        required=""
        className="w-select"
        value={this.state.value}
        onChange={this.handleInputChange}>
        <option value="">Select Country</option>
        <option value="United States">United States</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Congo, The Democratic Republic of The">
          Congo, The Democratic Republic of The
        </option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Cote D'ivoire">Cote D'ivoire</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guiana">French Guiana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="French Southern Territories">French Southern Territories</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-bissau">Guinea-bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="Korea, Democratic People's Republic of">
          Korea, Democratic People's Republic of
        </option>
        <option value="Korea, Republic of">Korea, Republic of</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macao">Macao</option>
        <option value="Macedonia, The Former Yugoslav Republic of">
          Macedonia, The Former Yugoslav Republic of
        </option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
        <option value="Moldova, Republic of">Moldova, Republic of</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Netherlands Antilles">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Norfolk Island">Norfolk Island</option>
        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Pitcairn">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russian Federation">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Helena">Saint Helena</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Georgia and The South Sandwich Islands">
          South Georgia and The South Sandwich Islands
        </option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Swaziland">Swaziland</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-leste">Timor-leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">
          United States Minor Outlying Islands
        </option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Viet Nam">Viet Nam</option>
        <option value="Virgin Islands, British">Virgin Islands, British</option>
        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
      </select>
    );
  };
}

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitInfo,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
