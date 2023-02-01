import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {useModal} from '../../context/Modal';
import { updateAReview } from "../../store/reviews"
import './reviewmodal.css'
