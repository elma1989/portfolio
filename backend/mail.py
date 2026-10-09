from dotenv import load_dotenv
from os import getenv
from email.message import EmailMessage
from email.utils import formataddr
import tmp_mail as tmp
import smtplib

load_dotenv()
owner_mail = getenv('OWNER_MAIL')
password = getenv('MAIL_PASSWORD')

def send_confirm(name: str, email:str) -> int:
    """
    Sends an e-mail to requester.

    :param name: Name of requester.
    :param email: E-Mail of requester.

    :returns:
    * ``0`` - Successful
    * ``1`` - Owner-Mail missing
    * ``2`` - Mail-Password missing
    * ``3`` - Failed mail connection
    * ``4`` - Wrong password

    """
    if not owner_mail: return 1
    if not password: return 2
    
    msg = EmailMessage()
    msg['From'] = formataddr(('Marco Elste', owner_mail))
    msg['To'] = email
    msg['Subject'] = 'Ihre Portfolioanfrage an Marco Elste'
    msg.set_content(tmp.confirm(name))

    try:
        with smtplib.SMTP('smtp.web.de', 587) as smtp:
            smtp.starttls()
            smtp.login(owner_mail, password)
            smtp.send_message(msg)

    except smtplib.SMTPConnectError: return 3
    except smtplib.SMTPAuthenticationError: return 4
    return 0

def send_request(name: str, email: str, question:str) -> int:
    """
    Sends an e-mail to portfolio owner.

    :param name: Name of requester.
    :param email: E-Mail of requester.
    :param question: Question of requester.

    :returns:
    * ``0`` - Successful
    * ``1`` - Owner-Mail missing
    * ``2`` - Password missing
    * ``3`` - Connection error
    * ``4`` - Wrong password
    """
    if not owner_mail: return 1
    if not password: return 2
    
    msg = EmailMessage()
    msg['From'] = formataddr((name, email))
    msg['To'] = owner_mail
    msg['Subject'] = f'Portfolioanfrage von {name}'
    msg.set_content(tmp.order(name, email, question))

    try:
        with smtplib.SMTP('smtp.web.de', 587) as smtp:
            smtp.starttls()
            smtp.login(owner_mail, password)
            smtp.send_message(msg)

    except smtplib.SMTPConnectError: return 3
    except smtplib.SMTPAuthenticationError: return 4
    return 0
