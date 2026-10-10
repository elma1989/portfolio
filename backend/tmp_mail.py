def confirm(name: str) -> str:
    """
    Creates mail text for requester of portolio.

    :param name: Name of requester.

    :returns: Preparared mail text for requester.
    """
    return f"""Hallo {name},

ich habe Ihre Anfrage erhalten und werde so schnell wie möglich antworten.

Vielen Dank!

Marco Elste"""

def order(name: str, email: str, question: str) -> str:
    """
    Creates mail text for owner of portfolio.

    :param name: Name of requester.
    :param email: E-Mal of reqeuster.
    :param question: Question of requester
    """
    return f"""Neue Portfolioanfrage:

    Name: {name}
    E-Mail: {email}
    Frage: {question}"""