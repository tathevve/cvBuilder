import React from 'react'
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slicers/personalSlice';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { selectWorkingUser } from '../redux/slicers/workSlice';
import { format } from 'date-fns';
import { selectEducation } from '../redux/slicers/educationSlice';
import { selectHonors } from '../redux/slicers/honorsSlice';
import { selectSkill } from '../redux/slicers/skillsSlice';
import { selectHobbie } from '../redux/slicers/hobbiesSlice';
import { selectLanguage } from '../redux/slicers/languagesSlice';

const useStyles = makeStyles((theme) => ({

  uniqueDescription: {
    color: 'black',
    fontWeight:"normal",
  },

  sidebar: {
    display: 'flex',
    width: '20%',
    backgroundColor: 'red',

  },

  previewLook: {
    width: '50%',
    margin: "0 auto",
    height: 'fit-content',
    backgroundColor: '#fff',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 25%)',
    padding: '25px 25px 80px',

  },

  personalInfoArea: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid gray',
    fontSize: '15px',
  },

  jobDescription: {
    marginTop: "20px",
    fontSize: "15px",
  },

  workArea: {
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    color: 'brown',
    fontWeight: 'bold',

  },
  workingDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px',
    color: "black",

  },
  companyName: {
    fontWeight: 'bold',
    fontSize: '14px',
  },

  sideArea: {
    fontSize: '12px',
    fontWeight: 'normal',
  },

  rowPages: {
    width: '100%',
    height: "15%",
  },

  columnPages: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },

  rowElement: {
    width: '50%',
  }

}));

function CVLook() {

  const working = useSelector(selectWorkingUser);
  const user = useSelector(selectUser);
  const styles = useStyles();
  const edu = useSelector(selectEducation);
  const honors = useSelector(selectHonors);
  const skills = useSelector(selectSkill);
  const hobbies = useSelector(selectHobbie);
  const languages = useSelector(selectLanguage);


  // console.log(working);
  return (
    <div className={styles.previewLook}>
      <div className={styles.personalInfoArea}>
        <div className={styles.leftColumn}>
          <h1> {user?.firstName} {" "}  {user?.lastName} </h1>
          <p>{user?.subtitle}</p>
          <p>{user?.firstAddress}</p>
          <p>{user?.secondAddress}</p>
        </div>
        <div className={styles.rightColumn}>
          {
            user?.phoneNumber.trim() ? <p><PhoneIcon />{" "} {user?.phoneNumber}</p> : null
          }
          {
            user?.email.trim() ? <p><EmailIcon />{" "}{user?.email}</p> : null
          }

        </div>


      </div>

      <div className={styles.jobDescription}>{user?.objective}</div>

      <div className={styles.rowPages}>
        {
          working.row?.length > 0 ?
            <div className={styles.workArea}>Work Experience</div>
            : null
        }
        {
          working.row?.length > 0 ? working.row.map((item) => (
            <div key={item.id}>

              <div className={styles.workArea}>

                <div className={styles.workingDetails}>
                  <div className={styles.sideArea}>
                    <p className={styles.companyName}>{item.name}</p>
                    <p>{item.role}</p>
                  </div>

                  <div className={styles.sideArea}>
                    <p>{"("} {format(
                      new Date(item.jobStart),
                      'dd/MM/yyyy',
                    )} {" - "}
                      {format(
                        new Date(item.jobEnd),
                        'dd/MM/yyyy',
                      )} {")"}</p>
                  </div>
                </div>

                <div className={styles.uniqueDescription}>
                  <p>{item.description}</p>
                </div>


              </div>



            </div>
          )) : null
        }
      </div>



      <div className={styles.rowPages}>
        {
          edu.row?.length > 0 ?
            <div className={styles.workArea}>Education</div>
            : null
        }
        {
          edu.row?.length > 0 ? edu.row.map((item) => (
            <div key={item.id}>

              <div className={styles.workArea}>

                <div className={styles.workingDetails}>
                  <div className={styles.sideArea}>
                    < p className={styles.companyName}>{item.name}</p>
                    <p>{item.major}</p>
                    <p>{item.grade}</p>
                  </div>

                  <div className={styles.sideArea}>
                    <p>{"("} {format(
                      new Date(item.startDate),
                      'dd/MM/yyyy',
                    )} {" - "}
                      {format(
                        new Date(item.endDate),
                        'dd/MM/yyyy',
                      )} {")"}</p>
                  </div>
                </div>

                <div className={styles.uniqueDescription}>
                  <p>{item.description}</p>
                </div>

              </div>



            </div>
          )) : null
        }
      </div>


      <div className={styles.columnPages}>

        <div className={styles.rowElement}>
          {
            honors.row?.length > 0 ?
              <div className={styles.workArea}>Honors & Awards</div>
              : null
          }
          {
            honors.row?.length > 0 ? honors.row.map((item) => (
              <div key={item.id}>

                <div className={styles.workArea}>

                  <div className={styles.workingDetails}>
                    <div className={styles.sideArea}>
                      <p className={styles.companyName}>{item.title}</p>
                      <p>{item.subtitle}</p>

                    </div>

                  </div>


                  <div className={styles.uniqueDescription}>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            )) : null
          }
        </div>

        <div className={styles.rowElement}>
          {
            skills.row?.length > 0 ?
              <div className={styles.workArea}>Skills</div>
              : null
          }
          {
            skills.row?.length > 0 ? skills.row.map((item) => (
              <div key={item.id}>

                <div className={styles.workArea}>

                  <div className={styles.workingDetails}>
                    <div className={styles.sideArea}>
                      <p className={styles.companyName}>{item.skillType}</p>

                    </div>

                  </div>
                </div>
              </div>
            )) : null
          }
        </div>
      </div>


      <div className={styles.columnPages}>
        <div className={styles.rowElement}>
          {
            hobbies.row?.length > 0 ?
              <div className={styles.workArea}>Hobbies</div>
              : null
          }
          {
            hobbies.row?.length > 0 ? hobbies.row.map((item) => (
              <div key={item.id}>

                <div className={styles.workArea}>

                  <div className={styles.workingDetails}>
                    <div className={styles.sideArea}>
                      <p className={styles.companyName}>{item.hobbieType}</p>

                    </div>

                  </div>
                </div>
              </div>
            )) : null
          }
        </div>
        <div className={styles.rowElement}>
          {
            languages.row?.length > 0 ?
              <div className={styles.workArea}>Languages</div>
              : null
          }
          {
            languages.row?.length > 0 ? languages.row.map((item) => (
              <div key={item.id}>

                <div className={styles.workArea}>

                  <div className={styles.workingDetails}>
                    <div className={styles.sideArea}>
                      <p className={styles.companyName}>{item.name}</p>
                      <p className={styles.companyName}>{item.level}</p>
                    </div>

                  </div>
                </div>
              </div>
            )) : null
          }
        </div>
      </div>



    </div>
  )
}

export default CVLook; 